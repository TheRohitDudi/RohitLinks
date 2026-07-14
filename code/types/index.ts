export interface PersonalLink {
  id: string
  title: string
  url: string
  icon: string
  visible: boolean
  order: number
  category?: string
  description?: string
}

export interface ProfileData {
  name: string
  handle?: string
  bio: string
  profileImage?: string
  links?: PersonalLink[]
}

export interface ThemeSettings {
  mode: "light" | "dark"
  accentColor: "cyan" | "purple" | "pink" | "green" | "orange" | "red"
}
