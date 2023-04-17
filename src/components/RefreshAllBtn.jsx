import classes from '@/styles/RefreshAllBtn.module.css';

export default function RefreshAllBtn(props) {
  return (
    <button onClick={props.refreshAll} className={classes.refreshAllBtn}>
      Refresh All
    </button>
  );
}
