import { h, Component } from 'preact'
import { url } from '../helpers'

const Menu = ({ menu }) => {
  return (
    <article class="menu-item">
      <h1>{menu.title}</h1>
      <h2>CHF {menu.price}</h2>
    </article>
  )
}

export class Location extends Component {
  constructor () {
    super()

    this.state.location = {}
    this.state.menus = []
  }

  componentWillMount () {
    this._fetchData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this._fetchData(nextProps)
  }

  render ({ location: _location }, { location, menus }) {
    return (
      <section>
        <h1>{location.name}</h1>
        { menus.map((menu) => <Menu menu={ menu }/>)}
      </section>
    )
  }

  _fetchData ({ location }) {
    let requests = Promise.all([
      fetch(url`https://themachine.jeremystucki.com/coop/api/v2/locations/${location}`)
        .then((resp) => resp.json()),
      fetch(url`https://themachine.jeremystucki.com/coop/api/v2/locations/${location}/menus`)
        .then((resp) => resp.json())
    ])

    return requests
      .then(([location, menus]) => this.setState({ location: location, menus: menus.results }))
  }
}
