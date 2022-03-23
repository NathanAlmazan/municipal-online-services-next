import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { BuildingAddress } from "../buildingTypes";

interface Props {
    address: BuildingAddress;
    label: string;
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
}

function BuildingAddress(props: Props) {
  const { address, label, handleValueChange, editable } = props;
  const { bldgNumber, street, barangay, city, province, postalCode, mainOffice } = address;

  return (
    <Paper variant="outlined" sx={{ mb: 3, borderColor: "red" }}>
        <Grid container spacing={3} alignItems="start" sx={{ p: 3 }}>
            <Grid item xs={12} md={4}>
                <Typography component="h1" variant="body1" textAlign="left">
                    {label}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="bldgNumber"
                            label="House/Bldg. No"
                            value={bldgNumber}
                            onChange={editable ? handleValueChange : undefined}

                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="street"
                            label="Street"
                            value={street}
                            onChange={editable ? handleValueChange : undefined}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="barangay"
                            label="Barangay"
                            value={barangay}
                            onChange={editable ? handleValueChange : undefined}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="city"
                            label="City / Municipality"
                            value={city}
                            onChange={editable ? handleValueChange : undefined}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="province"
                            label="Province"
                            value={province}
                            onChange={editable ? handleValueChange : undefined}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            required
                            name="postalCode"
                            label="Postal Code"
                            value={postalCode}
                            onChange={editable ? handleValueChange : undefined}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Paper>
  )
}

export default BuildingAddress