import {useMemo, useState} from 'react'

/** rough interview question:
 * write a password generator that allows the user to specify desired: password length, how many capitals, symbols, numbers to include and then spits out hte password
 */

const LOWERS = "abcdefghijklmnopqrstuvwxyz"
const CAPITALS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const NUMBERS = "01234567890"
const SYMBOLS = "!@£$%^&*()"

export default function Generator() {
  const [desiredLength, setDesiredLength] = useState(12)
  const [capitals, setCapitals] = useState(0)
  const [numbers, setNumbers] = useState(0)
  const [symbols, setSymbols] = useState(0)

  const password = useMemo(() => {
    const lowerCase = Math.max(0, desiredLength - capitals - numbers - symbols)

    let intermediate = ""
    for (const [range, count] of [[LOWERS, lowerCase], [CAPITALS, capitals], [NUMBERS, numbers], [SYMBOLS, symbols]] as const) {
      for (let i = 0; i < count; i++) {
        const chosenSymbol = range.charAt(Math.floor(Math.random() * range.length))
        const randomIndex = Math.floor(Math.random() * intermediate.length)
        intermediate += intermediate.slice(0, randomIndex) + chosenSymbol + intermediate.slice(randomIndex)
      }
    }

    return intermediate

  }, [desiredLength, capitals, numbers, symbols])

  return (
    <div>
      <div className='flex'>
        <ValueInput label="Length" value={desiredLength} setValue={setDesiredLength} />
        <ValueInput label="# Capitals" value={capitals} setValue={setCapitals} />
        <ValueInput label="# Numbers" value={numbers} setValue={setNumbers} />
        <ValueInput label="# Symbols" value={symbols} setValue={setSymbols} />
        <p>Password: {password}</p>
      </div>
    </div>
  )
}

function ValueInput({label, value, setValue}: {label: string, value: number, setValue: (x: number) => void}) {
  return <label>
    {label}
    <input type="number" value={value} onChange={(e) => setValue(e.target?.valueAsNumber)} />
  </label>
}
