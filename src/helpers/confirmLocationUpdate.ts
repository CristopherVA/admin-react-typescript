

export  const confirmLocationUpdate = (location, id) => {
    return (location === `/user/update/${id}`) ? true : false
}