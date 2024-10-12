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
import { fetchNewAds } from 'src/store/new/NewAdSlice';
import { ModelType, VersionType } from 'src/types/new';

const NewAdsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc'>('price-desc');
  useEffect(() => {
    dispatch(fetchNewAds(pageSize, currentPage, sortOrder));
  }, [currentPage, pageSize, sortOrder]);

  const newAds: ModelType[] | any[] = useSelector((state) => state.newAdReducer.newAds);
  const newAdsCount: number = useSelector((state) => state.newAdReducer.count);
  const currency = process.env.REACT_APP_CURRENCY;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSortOrderChange = (event: SelectChangeEvent<'price-asc' | 'price-desc'>) => {
    const newSortOrder = event.target.value as 'price-asc' | 'price-desc';
    setSortOrder(newSortOrder);
  };

  return (
    <>
      <Box sx={{ paddingBottom: 2 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortOrder} onChange={handleSortOrderChange}>
            <SelectMenuItem value="price-desc">High Price</SelectMenuItem>
            <SelectMenuItem value="price-asc">Low Price</SelectMenuItem>
          </Select>
        </FormControl>
      </Box>
      <BlankCard>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Model</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Brand</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Versions</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Price start at</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newAds.map((newAd) => (
                <TableRow key={newAd.brand + newAd.model}>
                  <TableCell>
                    <Typography variant="subtitle1" color="textSecondary">
                      <Link to={`/new/${newAd.brand}/${newAd.model}`}>{newAd.model} </Link>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" color="textSecondary">
                      {newAd.brand}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" color="textSecondary">
                      {newAd.versions.map((version: VersionType) => (
                        <>
                          <span>- {version.version}</span> <br />
                        </>
                      ))}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" color="textSecondary">
                      {currency} {Intl.NumberFormat('en-US').format(newAd.versions[0].price)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <Pagination
            count={Math.ceil(newAdsCount / pageSize)}
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

export default NewAdsTable;
