import styles from "@components/FilterSelection.module.scss";

export default function FilterSelection({ value, onChange, options }) {
  return (
    <div className={styles.filterBar}>
      <select
        value={value}
        onChange={onChange}
        className={styles.filterBarOption}
      >
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value}
              className={styles.filterBarOption}
            >
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
