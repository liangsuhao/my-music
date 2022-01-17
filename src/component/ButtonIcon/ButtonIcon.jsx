import style from './ButtonIcon.module.scss'

function ButtonIcon(props) {
  return (
    <button className={style.buttons}>{ props.content }</button>
  )
}

export default ButtonIcon;