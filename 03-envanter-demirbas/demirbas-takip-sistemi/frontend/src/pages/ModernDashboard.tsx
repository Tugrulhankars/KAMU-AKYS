import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Asset, Assignment, Category, AssetStatus } from '../types';
import { assetService } from '../services/assetService';
import { assignmentService } from '../services/assignmentService';
import { categoryService } from '../services/categoryService';
import Loading from '../components/common/Loading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Package,
  Layers,
  ClipboardList,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Calendar,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

interface StatCard {
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
  href: string;
  change?: number;
}

const ModernDashboard: React.FC = () => {
  const { user, hasRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssets: 0,
    availableAssets: 0,
    assignedAssets: 0,
    maintenanceAssets: 0,
    totalCategories: 0,
    recentAssignments: [] as Assignment[]
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [assets, categories, assignments] = await Promise.all([
        assetService.getAssets(),
        categoryService.getCategories(),
        assignmentService.getAssignments()
      ]);

      const availableAssets = assets.filter(a => a.status === AssetStatus.Available).length;
      const assignedAssets = assets.filter(a => a.status === AssetStatus.Assigned).length;
      const maintenanceAssets = assets.filter(a => a.status === AssetStatus.Maintenance).length;

      // Son 5 zimmet işlemi
      const recentAssignments = assignments
        .sort((a, b) => new Date(b.assignmentDate).getTime() - new Date(a.assignmentDate).getTime())
        .slice(0, 5);

      setStats({
        totalAssets: assets.length,
        availableAssets,
        assignedAssets,
        maintenanceAssets,
        totalCategories: categories.length,
        recentAssignments
      });
    } catch (error) {
      toast.error('Dashboard verileri yüklenirken hata oluştu');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" text="Dashboard yükleniyor..." />;
  }

  const statCards: StatCard[] = [
    {
      name: 'Toplam Demirbaş',
      value: stats.totalAssets,
      icon: Package,
      color: 'text-blue-600',
      href: '/dashboard/assets'
    },
    {
      name: 'Müsait Demirbaş',
      value: stats.availableAssets,
      icon: Package,
      color: 'text-green-600',
      href: '/dashboard/assets?status=available'
    },
    {
      name: 'Zimmetli Demirbaş',
      value: stats.assignedAssets,
      icon: ClipboardList,
      color: 'text-yellow-600',
      href: '/dashboard/assets?status=assigned'
    },
    {
      name: 'Bakımdaki Demirbaş',
      value: stats.maintenanceAssets,
      icon: AlertTriangle,
      color: 'text-red-600',
      href: '/dashboard/assets?status=maintenance'
    }
  ];

  if (hasRole(UserRole.Admin)) {
    statCards.push({
      name: 'Toplam Kategori',
      value: stats.totalCategories,
      icon: Layers,
      color: 'text-purple-600',
      href: '/dashboard/categories'
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hoş Geldiniz, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Demirbaş Takip Sistemi Dashboard
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0">
          <Link to="/dashboard/assets">
            <span className="mr-2">+</span> Yeni Demirbaş
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.name} to={card.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.name}
                    </p>
                    <p className="text-2xl font-bold">
                      {card.value}
                    </p>
                  </div>
                  <div className={cn("p-3 rounded-full bg-muted", card.color)}>
                    <card.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Son Zimmet İşlemleri</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentAssignments.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-sm font-medium">Henüz zimmet işlemi yok</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  İlk zimmet işleminizi başlatmak için demirbaş sayfasına gidin.
                </p>
                <div className="mt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard/assets">
                      <Package className="mr-2 h-4 w-4" />
                      Demirbaşları Görüntüle
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                    <div className="flex-shrink-0">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        "bg-primary/10 text-primary"
                      )}>
                        {assignmentService.getTypeText(assignment.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {assignment.asset?.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {assignment.user?.firstName} {assignment.user?.lastName}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-sm text-muted-foreground">
                      {new Date(assignment.assignmentDate).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard/assignments">
                      Tüm İşlemleri Görüntüle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Hızlı İşlemler</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/dashboard/assets">
                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <Package className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Demirbaşları Görüntüle</p>
                    <p className="text-sm text-muted-foreground">Tüm demirbaşları listele ve yönet</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>

              <Link to="/dashboard/assignments">
                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                  <ClipboardList className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Zimmet İşlemleri</p>
                    <p className="text-sm text-muted-foreground">Zimmet ve iade işlemlerini yönet</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>

              {hasRole(UserRole.Admin) && (
                <Link to="/dashboard/users">
                  <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                    <Users className="h-6 w-6 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Kullanıcı Yönetimi</p>
                      <p className="text-sm text-muted-foreground">Kullanıcıları yönet ve roller ata</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernDashboard; 