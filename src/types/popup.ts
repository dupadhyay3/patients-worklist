export type TPopupType = 'add' | 'edit' | 'view'
export type TPopup = TPopupType | null

export interface IPopupLblTitle {
  title: string
  lbl: string
}

export type IBtnPopupLblTitle = {
  [name in TPopupType]: IPopupLblTitle
}
