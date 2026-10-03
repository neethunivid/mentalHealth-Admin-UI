import React from 'react';
import '../../assets/css/health.css';
import adminLogo from '../../assets/images/logo.gif';
import logout from '../../assets/images/btn_logout.gif';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

const AdminHeaderComponent: React.FC = () => {
  return (
    <Box className="headerstyle">
      <TableContainer sx={{ padding: 0, textDecoration: "none" }}>
        <Table sx={{ padding: 0 }} border={0} align="center" cellPadding={0} cellSpacing={0}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ padding: 0, textDecoration: "none" }} width="10" align="left" valign="top" className="logo_bg_left">&nbsp;</TableCell>
              <TableCell sx={{ padding: 0, textDecoration: "none" }} width="884" align="left" valign="top" className="logo_bg_midle">
                <Link href="/home">
                  <img src={adminLogo} width="147" height="60" alt="Admin Logo" />
                </Link>
              </TableCell>
              <TableCell sx={{ padding: 0, textDecoration: "none" }} width="75" align="left" valign="top" className="logo_bg_midle">
                <Link href="/logout">

                  <img src={logout} width="48" height="60" alt="Logout" />
                </Link>
              </TableCell>
              <TableCell sx={{ padding: 0, textDecoration: "none" }} width="11" align="left" valign="top" className="logo_bg_right">&nbsp;</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminHeaderComponent;
