
<<<<<<< HEAD
const MockData = [
  { id: 1, name: "Michael Jordan", age: 23 },
  { id: 2, name: "Michael Jordan 2", age: 24 },
]

export const DownloadCsv = () => {


=======
interface MockData {
  id: number 
  name: string
  age: number
}

export const DownloadCsv = () => {

  const MockData = [
    { id: 1, name: "Michael Jordan", age: 23 },
    { id: 2, name: "Michael Jordan 2", age: 24 },
  ]
  
>>>>>>> a40adf82840efeca796fe3b36085d1fff4286c50

  const convertToCSV = (data: any) => {
    let result = ""

    const columnDelimeter = ',';
    const lineDelimeter = '\n';
    const keys = Object.keys(data[0])

    result = '';
    result += keys.join(columnDelimeter)
    result += lineDelimeter
  
    data.forEach((item: any) => {
      let ctr = 0;
      keys.forEach(key => {
        if(ctr> 0) result += columnDelimeter
        result += item[key]
        ctr++
      })
      result += lineDelimeter;
    })

    return result

  }

<<<<<<< HEAD
  const handleDownload = (data: []) => {
=======
  const handleDownload = (data: MockData[]) => {
>>>>>>> a40adf82840efeca796fe3b36085d1fff4286c50
    const link= document.createElement("a")
    let csv = convertToCSV(data)
    if(csv == null)  return

    const filename = "b360ai.csv"

    if(!csv.match(/^data:text\/cvv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }
    link.setAttribute("href", encodeURI(csv))
    link.setAttribute("download", filename)
    link.click()
  }

  return (<>
    <div>DownloadCsv</div>
    <button onClick={() => handleDownload(MockData)}>Download CSV</button>
    </>
  )
}
