import * as React from "react";
import { ProgressBar } from "react-bootstrap";

interface BarProps {
  userProgress: number,
  Number_Of_Levels: number,
  Level_Enabled: number
}

const UserProgressBar = (props: BarProps) => {
  return (
    <div>
      <ProgressBar className="mb-4">
        <ProgressBar
          variant="success"
          animated
          now={(props.userProgress * 100) / props.Number_Of_Levels}
          key={1}
        />
        <ProgressBar
          variant="warning"
          animated
          now={
            ((props.Level_Enabled - props.userProgress) * 100) /
            props.Number_Of_Levels
          }
          key={2}
        />
        <ProgressBar
          variant="danger"
          animated
          now={
            ((props.Number_Of_Levels - props.Level_Enabled) * 100) /
            props.Number_Of_Levels
          }
          key={3}
        />
      </ProgressBar>
    </div>
  );
};

export default UserProgressBar;
