import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'

export const labels = [
  { value: 'P', title: 'Sexual Content' },
  { value: 'G', title: 'Violent or Repulsive Content' },
  { value: 'R', title: 'Hateful or Abusive Content' },
  { value: 'X', title: 'Harmful Dangerous Acts' },
  { value: 'J', title: 'Child Abuse' },
  { value: 'Z', title: 'Spam' }
]

export const links = [
  {
    label: 'History',
    icon: faHistory,
    href: '/flagging_history'
  },
  {
    label: 'Templates',
    icon: faFlag,
    href: '/deputy?context=templates'
  },
  {
    label: 'Searches',
    icon: faSearch,
    href: '/deputy?context=searches'
  },
  {
    label: 'Targets',
    icon: faBullseye,
    href: '/deputy?context=targets'
  },
  {
    label: 'Analytics',
    icon: faChartLine,
    href: '/deputy?context=analytics'
  }
]

export const MAX_TEMPLATES = 8
