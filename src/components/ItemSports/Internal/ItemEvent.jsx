export const ItemEvent = ({ event }) => {

    return (
        <section className="item_sports--event-main">
            <p className="item_sports--event-subtitle">{`Evento - ${event.name}`}</p>
        </section>
    )
}