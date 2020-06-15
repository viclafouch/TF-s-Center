import startDeputy from './deputy/index'

const currentUrl = new URL(window.location.href)

if (
  currentUrl.pathname === '/deputy' ||
  currentUrl.pathname === '/flagging_history' ||
  currentUrl.pathname === '/report_dashboard'
) {
  console.log('startDeputy')
  startDeputy({ currentUrl })
}
