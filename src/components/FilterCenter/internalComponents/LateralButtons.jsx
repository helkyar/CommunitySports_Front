import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HearingIcon from '@mui/icons-material/Hearing';

export const LateralButtons = ({ adapt, setAdapt }) => {
    const discapacities = [
        { icon: <AccessibleForwardIcon />, value: 'mobility' },
        { icon: <VisibilityIcon />, value: 'ind_magnetica' },
        { icon: <HearingIcon />, value: 'podotactile' }
    ]

    const addAdapt = (discapacity) => {
        if (adapt.indexOf(discapacity) === -1) {
            setAdapt([...adapt, discapacity])
        } else {
            const filterAdapts = adapt.filter(e => {
                if (e !== discapacity) return e
            })
            setAdapt(filterAdapts)
        }
    }

    return (
        <div className="filter_center--control-buttons">
            {discapacities.map((e, i) => {
                return (
                    <div key={i}>
                        <button
                            value={e.value}
                            onClick={() => addAdapt(e.value)}
                            className={
                                adapt.indexOf(e.value, 0) === -1 ?
                                    "filter--button" : "filter--button-added"
                            }
                        >
                            {e.icon}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}