import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  LinearProgress,
  Fab
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Cancel,
  Person,
  FilterList,
  Refresh
} from '@mui/icons-material';
import { antrenorAPI } from '../services/api';

const Antrenorler = () => {
  const [antrenorler, setAntrenorler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAntrenor, setSelectedAntrenor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadAntrenorler();
  }, []);

  const loadAntrenorler = async () => {
    try {
      setLoading(true);
      const response = await antrenorAPI.getAll();
      setAntrenorler(response.data.data || []);
    } catch (error) {
      console.error('Antrenörler yüklenirken hata:', error);
      showSnackbar('Antrenörler yüklenirken hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAntrenorler();
      return;
    }

    try {
      setLoading(true);
      const response = await antrenorAPI.search(searchTerm);
      setAntrenorler(response.data.data || []);
    } catch (error) {
      console.error('Arama hatası:', error);
      showSnackbar('Arama sırasında hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === 'active') {
        await antrenorAPI.activate(id);
        showSnackbar('Antrenör başarıyla aktifleştirildi', 'success');
      } else {
        await antrenorAPI.deactivate(id);
        showSnackbar('Antrenör başarıyla deaktifleştirildi', 'success');
      }
      loadAntrenorler();
    } catch (error) {
      console.error('Durum değiştirme hatası:', error);
      showSnackbar('Durum değiştirilirken hata oluştu', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu antrenörü silmek istediğinizden emin misiniz?')) {
      try {
        await antrenorAPI.delete(id);
        showSnackbar('Antrenör başarıyla silindi', 'success');
        loadAntrenorler();
      } catch (error) {
        console.error('Silme hatası:', error);
        showSnackbar('Antrenör silinirken hata oluştu', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredAntrenorler = antrenorler.filter(antrenor => {
    const matchesSearch = antrenor.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         antrenor.trainerNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         antrenor.expertiseArea?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && antrenor.isActive) ||
                         (filterStatus === 'inactive' && !antrenor.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'error';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Aktif' : 'Pasif';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Başlık ve arama */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Antrenörler
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Antrenör ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Durum Filtresi</InputLabel>
              <Select
                value={filterStatus}
                label="Durum Filtresi"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">Tümü</MenuItem>
                <MenuItem value="active">Aktif</MenuItem>
                <MenuItem value="inactive">Pasif</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={loadAntrenorler}
              >
                Yenile
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setDialogOpen(true)}
              >
                Yeni Antrenör
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Antrenör tablosu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Antrenör</TableCell>
              <TableCell>Antrenör No</TableCell>
              <TableCell>Uzmanlık Alanı</TableCell>
              <TableCell>Seviye</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Kayıt Tarihi</TableCell>
              <TableCell align="center">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAntrenorler.map((antrenor) => (
              <TableRow key={antrenor.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {antrenor.user?.fullName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {antrenor.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{antrenor.trainerNumber}</TableCell>
                <TableCell>{antrenor.expertiseArea}</TableCell>
                <TableCell>{antrenor.level}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(antrenor.isActive)}
                    color={getStatusColor(antrenor.isActive)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(antrenor.createdAt).toLocaleDateString('tr-TR')}
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setSelectedAntrenor(antrenor)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setSelectedAntrenor(antrenor)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color={antrenor.isActive ? 'error' : 'success'}
                      onClick={() => handleStatusChange(antrenor.id, antrenor.isActive ? 'inactive' : 'active')}
                    >
                      {antrenor.isActive ? <Cancel /> : <CheckCircle />}
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(antrenor.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Boş durum */}
      {filteredAntrenorler.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Antrenör bulunamadı
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Arama kriterlerinizi değiştirmeyi deneyin
          </Typography>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Antrenorler; 