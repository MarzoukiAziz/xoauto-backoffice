import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Pagination,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import BlankCard from '../../../components/shared/BlankCard';
import { dispatch, useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
import { fetchAds } from 'src/store/ad/AdSlice';
import { AdType } from 'src/types/ad';
import { formattedDate } from 'src/utils/usefulFunctions/formattedDate';

const AdsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  useEffect(() => {
    dispatch(fetchAds('', pageSize, currentPage, sortOrder));
  }, [currentPage, pageSize, sortOrder]);

  const ads: AdType[] | any[] = useSelector((state) => state.adReducer.ads);
  const adsCount: number = useSelector((state) => state.adReducer.count);
  const currency = process.env.REACT_APP_CURRENCY;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<'asc' | 'desc'>) => {
    const newSortOrder = event.target.value as 'asc' | 'desc';
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <Box sx={{ paddingBottom: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortOrder} onChange={handleSortOrderChange}>
            <SelectMenuItem value="desc">Newest</SelectMenuItem>
            <SelectMenuItem value="asc">Oldest</SelectMenuItem>
          </Select>
        </FormControl>
      </Box>
      <BlankCard>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Vehicule</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Publisher</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Views</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Published At</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.map(
                (ad) =>
                  ad._id && (
                    <TableRow key={ad._id}>
                      <TableCell>
                        <Typography variant="subtitle1" color="textSecondary">
                          <Link to={`/ad/${ad._id}`}>
                            {ad.brand + ' ' + ad.model + ' ' + ad.version}
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component={Link} to={`/user/${ad.uid?._id}`} variant="h6">
                          {ad.uid?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" color="textSecondary">
                          {currency} {Intl.NumberFormat('en-US').format(ad.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" color="textSecondary">
                          {ad.views}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" color="textSecondary">
                          {ad.createdAt ? formattedDate(ad.createdAt) : 'N/A'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ),
              )}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <Pagination
            count={Math.ceil(adsCount / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'center' }}
          />
        </TableContainer>
      </BlankCard>
    </>
  );
};

export default AdsTable;
