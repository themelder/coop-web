import { h, Component } from 'preact'
import { fetchLocations } from '../api'

export class Locations extends Component {
  constructor () {
    super()

    this.state.locations = []
    this.state.filteredLocations = []
    this.state.search = null
  }

  _onChange = (location) => {
    return (event) => {
      event.preventDefault()

      this.props.onChange(location)
    }
  }

  _onInput = (event) => {
    const search = event.target.value.toLowerCase()

    const filteredLocations = this.state.locations
      .map((location) => ({ location, match: location.name.toLowerCase().indexOf(search) }))
      .filter(({ match }) => match > -1)
      .sort((a, b) => a.match > b.match)
      .map(({ location }) => location)

    this.setState({ filteredLocations })
  }

  componentDidMount () {
    return fetchLocations()
      .then(({ results }) => this.setState({ locations: results, filteredLocations: results }))
  }

  render ({ onSelectLocation }, { filteredLocations }) {
    return (
      <div>
        <input type="search" placeholder="Search" onInput={this._onInput} class="locations-search"/>
        <ul class="locations-list">
          { filteredLocations.map((location) => (
            <li class="location">
              <a href="#" onClick={this._onChange(location.id)}>{location.name}</a>
            </li>
          )) }
        </ul>
      </div>
    )
  }
}
