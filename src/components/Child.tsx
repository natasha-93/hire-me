import { useState } from "react";
import useChild from "../hooks/useChild";
import { Child as ChildData } from "../models/child";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

type ChildProps = {
  data: ChildData;
};

export default function Child({ data }: ChildProps) {
  const child = useChild(data.childId);
  const [pickupTime, setPickupTime] = useState("16:00");

  if (child.checkInChildError) {
    console.log(child);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Avatar alt={data.name.fullName} src={data.image.small} />
      <ListItemText style={{ marginLeft: "2vw", marginRight: "2vw" }}>
        {data.name.fullName}
      </ListItemText>

      <div style={{ flex: 1 }} />
      <TextField
        disabled={data.checkedIn}
        error={!!child.checkInChildError}
        helperText={child.checkInChildError?.message}
        id="time"
        label="Pickup Time"
        type="time"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        style={{ minWidth: "15vw" }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ minWidth: "15vw" }}
        onClick={(e) => {
          if (data.checkedIn) {
            child.checkOutChild();
          } else {
            child.checkInChild(pickupTime);
          }
        }}
      >
        {data.checkedIn ? "Check out" : "Check in"}
      </Button>
    </div>
  );
}
