package com.kamu.akys.anket.controller;

import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.repository.GroupMemberRepository;
import com.kamu.akys.anket.repository.GroupRepository;
import com.kamu.akys.anket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private GroupMemberRepository groupMemberRepository;
    @Autowired
    private UserRepository userRepository;

    // Grup oluşturma
    @PostMapping
    public ResponseEntity<Group> createGroup(@RequestBody Group group, Principal principal) {
        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();
        group.setAdmin(admin);
        // Basit bir joinKey üretimi (daha güvenli bir yöntem önerilir)
        group.setJoinKey(java.util.UUID.randomUUID().toString());
        Group saved = groupRepository.save(group);
        // Admin otomatik olarak onaylı üye olsun
        GroupMember gm = new GroupMember();
        gm.setGroup(saved);
        gm.setUser(admin);
        gm.setStatus("APPROVED");
        gm.setRole("ADMIN");
        groupMemberRepository.save(gm);
        return ResponseEntity.ok(saved);
    }

    // Kullanıcının üye olduğu grupları listele
    @GetMapping("/my")
    public List<Group> getMyGroups(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<GroupMember> myMemberships = groupMemberRepository.findByUserAndStatus(user, "APPROVED");
        return myMemberships.stream().map(GroupMember::getGroup).toList();
    }

    // Grup detaylarını getir
    @GetMapping("/{groupId}")
    public ResponseEntity<Group> getGroupById(@PathVariable Long groupId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Grup admin'i veya onaylanmış üye mi kontrol et
        boolean isAdmin = group.getAdmin().getId().equals(user.getId());
        GroupMember gm = groupMemberRepository.findByGroupAndUser(group, user);
        boolean isApprovedMember = gm != null && "APPROVED".equals(gm.getStatus());
        
        if (!isAdmin && !isApprovedMember) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(group);
    }

    // JoinKey ile gruba katılma
    @PostMapping("/join-with-key")
    public ResponseEntity<?> joinGroupWithKey(@RequestParam String joinKey, Principal principal) {
        Group group = groupRepository.findByJoinKey(joinKey);
        if (group == null) return ResponseEntity.notFound().build();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        // Zaten başvuru var mı kontrolü
        if (groupMemberRepository.findByGroupAndUser(group, user) != null)
            return ResponseEntity.badRequest().body("Zaten başvuru/üyelik var");
        GroupMember gm = new GroupMember();
        gm.setGroup(group);
        gm.setUser(user);
        gm.setStatus("PENDING");
        gm.setRole("MEMBER"); // Varsayılan rol MEMBER
        groupMemberRepository.save(gm);
        return ResponseEntity.ok("Başvuru alındı, onay bekleniyor");
    }

    // Grubun üyelerini listele (admin görür)
    @GetMapping("/{groupId}/members")
    public List<GroupMember> getGroupMembers(@PathVariable Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        return groupMemberRepository.findByGroup(group);
    }

    // Üyelik onaylama (admin yapar)
    @PostMapping("/{groupId}/approve/{userId}")
    public ResponseEntity<?> approveMember(@PathVariable Long groupId, @PathVariable Long userId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();
        if (!group.getAdmin().getId().equals(admin.getId()))
            return ResponseEntity.status(403).body("Sadece admin onaylayabilir");
        User user = userRepository.findById(userId).orElseThrow();
        GroupMember gm = groupMemberRepository.findByGroupAndUser(group, user);
        if (gm == null) return ResponseEntity.notFound().build();
        gm.setStatus("APPROVED");
        groupMemberRepository.save(gm);
        return ResponseEntity.ok("Üyelik onaylandı");
    }

    // Üyelik reddetme (admin yapar)
    @PostMapping("/{groupId}/reject/{userId}")
    public ResponseEntity<?> rejectMember(@PathVariable Long groupId, @PathVariable Long userId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();
        if (!group.getAdmin().getId().equals(admin.getId()))
            return ResponseEntity.status(403).body("Sadece admin reddedebilir");
        User user = userRepository.findById(userId).orElseThrow();
        GroupMember gm = groupMemberRepository.findByGroupAndUser(group, user);
        if (gm == null) return ResponseEntity.notFound().build();
        groupMemberRepository.delete(gm);
        return ResponseEntity.ok("Üyelik reddedildi");
    }

    // Tüm bekleyen üyeleri onayla (admin yapar)
    @PostMapping("/{groupId}/approve-all")
    public ResponseEntity<?> approveAllPending(@PathVariable Long groupId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();
        if (!group.getAdmin().getId().equals(admin.getId()))
            return ResponseEntity.status(403).body("Sadece admin onaylayabilir");
        List<GroupMember> pendings = groupMemberRepository.findByGroup(group).stream()
            .filter(gm -> "PENDING".equals(gm.getStatus()))
            .toList();
        for (GroupMember gm : pendings) {
            gm.setStatus("APPROVED");
            groupMemberRepository.save(gm);
        }
        return ResponseEntity.ok("Tüm bekleyen üyeler onaylandı");
    }

    // Tüm bekleyen üyeleri reddet (admin yapar)
    @PostMapping("/{groupId}/reject-all")
    public ResponseEntity<?> rejectAllPending(@PathVariable Long groupId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User admin = userRepository.findByEmail(principal.getName()).orElseThrow();
        if (!group.getAdmin().getId().equals(admin.getId()))
            return ResponseEntity.status(403).body("Sadece admin reddedebilir");
        List<GroupMember> pendings = groupMemberRepository.findByGroup(group).stream()
            .filter(gm -> "PENDING".equals(gm.getStatus()))
            .toList();
        for (GroupMember gm : pendings) {
            groupMemberRepository.delete(gm);
        }
        return ResponseEntity.ok("Tüm bekleyen üyeler reddedildi");
    }
} 