import { Link } from "react-router-dom"

export const ItemEvent = ({ event }) => {

    return (
        <section className="item_sports--event-main">
            <p className="item_sports--event-subtitle">
                {`Evento - ${event.name}`}
                <button className="item_sports--button">
                    <Link className="item_sports--Link" to={`/events/detail/${event.id}`}>GO</Link>
                </button>
            </p>
        </section>
    )
}