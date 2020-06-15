import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin'

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
    label: 'Dashboard',
    icon: faTachometerAlt,
    href: '/report_dashboard'
  },
  {
    label: 'Flagger',
    icon: faFlag,
    href: '/deputy'
  },
  {
    label: 'History',
    icon: faHourglassEnd,
    href: '/flagging_history'
  },
  {
    label: 'Templates',
    icon: faPaste,
    href: '/deputy?context=templates'
  },
  {
    label: 'Searches',
    icon: faSearchengin,
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
