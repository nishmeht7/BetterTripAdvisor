const fetchRequest = (url, method, query) => {
	let headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    let methodObj = {
    	method: method,
    	credentials: 'include',
    	headers: headers,
    }

    if(method === "POST") {
    	methodObj = {...methodObj, body: query}
    }


    console.log("method obj: ", methodObj)
    return fetch(url, methodObj)
    .then(res => {
      if(res.ok) {
      	console.log("res: ", res)
      	return res.json();
      }
    })
    .catch(e => console.log("error logging out: ", e))
}

export default fetchRequest;
