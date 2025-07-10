package com.kamu.akys.anket.repository;

import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    List<GroupMember> findByGroup(Group group);
    List<GroupMember> findByUser(User user);
    List<GroupMember> findByUserAndStatus(User user, String status);
    GroupMember findByGroupAndUser(Group group, User user);
} 