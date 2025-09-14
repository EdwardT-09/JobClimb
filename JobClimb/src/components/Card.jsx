//card that takes CardHeader and CardContent as children and displays them
export function Card({className, children}){
    return(
        <div className={className}>
        {children}
        </div>
    )
}

//CardHeader that takes its childrens and displays them
export function CardHeader({children}){
    return(
        <div className="card-header">
            {children}
        </div>
    )
}

//CardContent that takes its childrens and displays them
export function CardContent({children}){
    return(
        <div className="card-body">
            {children}
        </div>
    )
}