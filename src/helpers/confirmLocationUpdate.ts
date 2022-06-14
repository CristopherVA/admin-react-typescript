

export  const confirmLocationUpdate = (location:string, id:number) => {
    return (location === `/user/update/${id}`) ? true : false
}