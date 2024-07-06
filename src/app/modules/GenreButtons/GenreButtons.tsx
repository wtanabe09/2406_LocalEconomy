import styles from "./button.module.css";

type Props = {
  genres: string[],
  handleButton: (genreNum: number) => void
}
export const GenreButtons = ({ genres, handleButton }: Props) => {
  return (
    <div>
      { genres? (
          genres.map((genre, index) => (
            <button key={index} onClick={() => handleButton(index)} className={styles.button}>
              {genre}
            </button>
          ))
        ) : (
          <h3>Button loading</h3>
        )
      }
    </div>
  );
}