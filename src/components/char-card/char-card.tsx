import CharImg from "../char-img"

import { RickAndMortyCharacter } from "models/rick-and-morty-character"

import styles from "styles/char-card/char-card.module.scss"
import getColorThemeFrom, {
  ThemedContainerType,
  getContainerThemeFor,
} from "utils/get-theme-for"

import { ComponentDictionary } from "dictionaries"

// #region Generate fandom url for character
// URL template: https://rickandmorty.fandom.com/wiki/Rick_Sanchez
const kPrefixRaMFandomCharPage = "https://rickandmorty.fandom.com/wiki/"
const kReplacementSpace = "_"
function getFandomURLFor(characterName: string) {
  return (
    kPrefixRaMFandomCharPage + characterName.replace(/ /g, kReplacementSpace)
  )
}
// #endregion

// #region Character Card Row
interface _CharCardRowProps {
  label: string
  value: string | number
}

function _CharCardRow({ label, value }: _CharCardRowProps) {
  return (
    <div className={styles.charCardRow}>
      <p className={styles.charCardLabel}>{`${label}:`}</p>
      <p className={styles.charCardValue}>{value}</p>
    </div>
  )
}
// #endregion

// #region Arrow Outward Icon component
interface _ArrowOutwardIconProps {
  themeClass: string
}

function _ArrowOutwardIcon({ themeClass }: _ArrowOutwardIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={themeClass}
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
    </svg>
  )
}
// #endregion

// #region Character Card
interface CharCardProps {
  character: RickAndMortyCharacter
  dictionary: ComponentDictionary
  index: number
}

// TODO: Add color fill on hover to CharCard
// FIXME: When the detail text is too long, it renders at the left,
// adjacent to label, instead of staying at right-hand side.
export default function CharCard({
  character,
  dictionary,
  index,
}: CharCardProps) {
  const contThemeClass = getContainerThemeFor(
    ThemedContainerType.Outlined,
    index,
  )
  const atrClassCont = `${styles.charCardContainer} ${contThemeClass}`

  const themeClass = getColorThemeFrom(index)
  const atrNameAnchor = `${styles.charNameAnchor} ${themeClass}`

  const labelDict = dictionary.charCard.labels

  const episodeCount = character.episode.length
  const origin = character.origin.name
  const location = character.location.name

  return (
    <div className={atrClassCont}>
      <div className={styles.charCardHeader}>
        <CharImg
          name={character.name}
          url={character.image}
          dictionary={dictionary}
        />
        <a className={atrNameAnchor} href={getFandomURLFor(character.name)}>
          {character.name}
          <_ArrowOutwardIcon themeClass={getColorThemeFrom(index)} />
        </a>
      </div>
      <_CharCardRow label={labelDict.episode} value={episodeCount} />
      <_CharCardRow label={labelDict.species} value={character.species} />
      <_CharCardRow label={labelDict.status} value={character.status} />
      <_CharCardRow label={labelDict.gender} value={character.gender} />
      <_CharCardRow label={labelDict.origin} value={origin} />
      <_CharCardRow label={labelDict.location} value={location} />
    </div>
  )
}
// #endregion
