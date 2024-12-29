import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number; size: number; fontSize: string }
) {
  const circleColor = props.value < 50 ? 'red' : `rgb(${255 - (props.value - 50) * 5}, ${props.value * 5}, 0)`;
  const sizeCircle = props.size;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={sizeCircle}
        sx={{
          color: circleColor,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'white', fontSize: props.fontSize }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
