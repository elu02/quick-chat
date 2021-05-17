import { useState } from 'react'
import { ThemeProvider,  createMuiTheme } from '@material-ui/core/styles'
import Site from './components/Site'

const App = () => {
  const [ temperature, setTemperature ] = useState("warm")
  const cool = createMuiTheme({
    bg: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    navbg: '#DDDDDD',
    textcol: "#000000",
    palette: {
      type: "light"
    }
  })
  const warm = createMuiTheme({
    bg: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    navbg: '#444444',
    textcol: "#DDDDDD",
    pallete: {
      type: "dark"
    }
  })
  return (
    <ThemeProvider theme={temperature === "cool" ? cool : warm}>
      <Site temperature={temperature} setTemperature={setTemperature}/>
    </ThemeProvider>
  )
}

export default App
