import classes from '@/styles/Loader.module.css';

export default function Loader() {
  return (
    <div className={classes.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
