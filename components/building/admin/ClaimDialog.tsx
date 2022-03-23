import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Stack from '@mui/material/Stack';
import { useAuth } from '../../../hocs/FirebaseProvider';
import { apiPostRequest } from '../../../hocs/axiosRequests';
import uploadCertificateToFirebase from '../../../hocs/uploadCertificate';

interface Props {
    open: boolean;
    handleClose: () => void;
    buildingId: number;
}

export default function ClaimDialog(props: Props) {
    const { open, handleClose, buildingId } = props;
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [error, setError] = React.useState(false);
    const [certificateFile, setCertificateFile] = React.useState<File | null>(null);
    const { currentUser } = useAuth();

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setCertificateFile(event.target.files[0]);
      }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (value == null) setError(true);
        else if (!certificateFile) setError(true);
        else {
          const certificate = await uploadCertificateToFirebase(certificateFile, certificateFile.name);
            const body = JSON.stringify({
                buildingId: buildingId,
                schedule: value.toISOString(),
                certificateFile: certificate
            })

            await apiPostRequest('/building/appointment', body, currentUser?.accessToken);
            handleClose();
        }
    }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Release Building Permit</DialogTitle>
        <DialogContent>
       
          <DialogContentText>
            Please provide the following information to inform the applicant about the details of claiming their business permit. 
          </DialogContentText>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Release Date"
                        inputFormat="MM/dd/yyyy"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={certificateFile ? <DownloadDoneIcon /> : <UploadIcon />}
                >
                    {certificateFile ? "Uploaded" : "Upload Certificate"}
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        onChange={handleFileChange}
                        hidden 
                    />
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
  );
}
