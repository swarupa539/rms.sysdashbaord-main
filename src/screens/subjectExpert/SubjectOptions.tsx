import { Box, Button, Dialog, DialogContent, IconButton, Toolbar } from "@mui/material";
import FileSaver from "file-saver";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadSingle from "../../components/FileUpload/FileUploadSingle";
import { axiosClient, downnLoadExcel } from "../../api/apiAgent";
import CloseIcon from "@mui/icons-material/Close";

const SubjectOptions = (props:any) => {
    const navigate = useNavigate();
    const [reopen, setReOpen] = useState(false);

      const handleOpen = () => {
        setReOpen(true);
      };
      const handleClose = () => {
        setReOpen(false);
      };
      const downloadFile = () => {
        downnLoadExcel()
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
            document.body.appendChild(link);
            link.click();
          }) 
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <div>
            <Box sx={{ '& button': { m: 2 } }}>
            <div>
           <Button variant="contained" onClick={handleOpen} className={"manage-buttons"}>  
               File Upload
             </Button>
             {/* <FileUploadSingle/> */}
            </div>
            <Dialog fullWidth maxWidth="sm" open={reopen}>
               <DialogContent>
                 {/* <AppBar className="add-appbar"> */}
                   <Toolbar>                
                     <IconButton color="inherit" onClick={handleClose} aria-label="close"
                       className="add-close-dialog">
                       <CloseIcon />
                     </IconButton>
                   </Toolbar>
                 {/* </AppBar> */}
                 <FileUploadSingle/>
               </DialogContent>
             </Dialog>
                  <Button variant="contained" onClick={downloadFile} className={"manage-buttons"}>
                     File Download
                   </Button>
                   
           </Box>
           </div>
      );

    };
    export default SubjectOptions;