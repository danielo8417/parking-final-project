import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";


export const AdminParkingModal = ({ parkingLot }) => {

    const [parkingData, setParkingData] = useState({})

    const handleChange = (event) => {
        setParkingData({ ...parkingData, [event.target.name]: event.target.value })
    }

    const senddata = async () => {

        try {
            const call = await fetch(process.env.BACKEND_URL + "/api/modify_parking_info/" + parking.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                    body: JSON.stringify(parkingData),
                })

            const data = await call.json()
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setParkingData(parkingLot)
    }, [])

    return (
        <div className="modal fade" id={`exampleModal${parkingLot.id}`} aria-labelledby={`#exampleModalLabel${parkingLot.id}`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar datos</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <Typography component="h5">Site</Typography><br />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size="small"
                                    autoComplete="site"
                                    name="site"
                                    onChange={handleChange}
                                    id="site"
                                    label={parkingLot.site}
                                    autoFocus
                                    placeholder={parkingLot.site}
                                />
                            </Grid>
                        </Grid><br />

                        <Typography component="h5">Occupied</Typography><br />
                        <TextField
                            size="small"
                            id="occupied"
                            fullWidth
                            onChange={handleChange}
                            label={parkingLot.occupied}
                            name="occupied"
                            autoComplete="occupied"
                            placeholder={parkingLot.occupied}
                        /><br /><br />

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={senddata}>Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    )
}