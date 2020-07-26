import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons/faTachometerAlt'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink'
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin'

export const videoLabels = [
  { value: 'P', title: 'Sexual Content' },
  { value: 'G', title: 'Violent or Repulsive Content' },
  { value: 'R', title: 'Hateful or Abusive Content' },
  { value: 'X', title: 'Harmful Dangerous Acts' },
  { value: 'J', title: 'Child Abuse' },
  { value: 'Z', title: 'Spam' }
]

export const channelLabels = [
  { value: '1', title: 'Child endangerment' },
  { value: '6', title: 'Spam and scams' }
]

export const channelIssues = [
  { value: 'Metadata (video titles, descriptions)', title: 'Metadata (video titles, descriptions)' },
  { value: 'Playlists', title: 'Playlists' },
  { value: 'Comments', title: 'Comments' },
  { value: 'Thumbnails', title: 'Thumbnails' },
  { value: 'Channel Art/Icon', title: 'Channel Art/Icon' },
  { value: "Links in the user's content", title: "Links in the user's content" },
  { value: 'Live chat', title: 'Live chat' }
]

export const links = [
  {
    label: 'Dashboard',
    icon: faTachometerAlt,
    href: '/deputy?context=dashboard'
  },
  {
    label: 'Flagger',
    icon: faFlag,
    href: '/deputy'
  },
  {
    label: 'URLs report',
    icon: faLink,
    href: '/deputy/url_report'
  },
  {
    label: 'History',
    icon: faHourglassEnd,
    href: 'https://www.youtube.com/reporthistory',
    external: true
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
