import { withStyles } from '@material-ui/core/Styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Zoom from '@material-ui/core/Zoom';



  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip)

export default function InfoIcon(props) {

    return (
        <LightTooltip title={props.info} placement="right" TransitionComponent={Zoom}>
        <InfoOutlinedIcon style={{fontSize: props.fontSize, color: "yellow"}} />
        </ LightTooltip>
    )
}