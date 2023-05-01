import styles from "@components/FilterSelection.module.scss";

export default function FilterSelection({ value, onChange, options }) {
  return (
    <div className={styles.filterBar}>
      {options.map((option, index) => {
        return (
          <button
            onClick={() => onChange(option.value)}
            className={
              option.value === value
                ? styles.filterButtonClicked
                : styles.filterButton
            }
            key={index}
            // style={{ background: option.value === value ? styles : "gray" }}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}
