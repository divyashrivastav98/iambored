export default function Card({ activity, type, participants }) {
    return (
        <div className="border-2 p-8 flex flex-col gap-8">
            <h2 className="font-bold">{ activity }</h2>
            <div className="flex justify-between gap-4">
                <span>{ type }</span>
                <span>participants: { participants }</span>
            </div>
        </div>           
        
    )
}