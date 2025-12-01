class Util {
  static BookCheckoutIsbnURL(data) {
    return `book_checkout_isbn/${data.username}_${data.isbn}`
  }

  /*  Utility function for making queryies to the backend fastapi server
   *    query     - the actual query (this should be the endpoint with whatever information required)
   *    onreceive - callback function pointer, this is called with the response when/if it is received
   */
  static MakeBackendQuery(query, onreceive, onerror) {
    fetch(`http://127.0.0.1:8001/${query}`).then(res => {
        if (!res.ok) {
            console.error('invalid response')
            throw new Error(`invalid response: ${res.status}`)
        }
      return res.json();
    }).then(data => {
      onreceive(data);
    }).catch(err => {
      if (onerror) {
        onerror(err)
      }
      else {
        console.error(`unhandled error ${err}`)
      }
    })
  }
}
