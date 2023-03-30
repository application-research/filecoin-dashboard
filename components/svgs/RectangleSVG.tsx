export default function RectangleSVG(props) {
  return (
    <svg
      className={props.className}
      width={props.width ? props.width : "200px"}
      height={props.height ? props.height : "140px"}
      viewBox="0 0 933 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 32C0 14.3269 14.3269 0 32 0H901C918.673 0 933 14.3269 933 32V140H0V32Z"
        fill="black"
      />
    </svg>
  );
}
