import { Box, Slider } from "@mui/material";

export const MultiRangeSlider = (props) => {

    const handleChange = (even, newValue) => {
        props.setValue(newValue)
    }

    return (
        <Box
            width={'90%'}
            margin={'auto'}>
            <Slider
                className="multirange-slider"
                getAriaLabel={() => 'height range'}
                value={props.value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    )
}