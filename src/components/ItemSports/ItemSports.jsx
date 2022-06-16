import { useTranslation } from "react-i18next";
import { ItemEvent } from "./Internal/ItemEvent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";

export const ItemSports = ({ sport, index, events }) => {
    const [t, i18n] = useTranslation("global");
    const [deploy, setDeploy] = useState(false)

    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return (
        <section className={deploy ? `item_sports--main-item item_sports--item-${index} item_sports--main-item-deploy` : `item_sports--main-item item_sports--item-${index}`}>
            <div className="item_sports--slot-title">
                <h5 className="item_sports--item-title">{t(`sports.${removeAccents(sport.name)}`)}</h5>
                {deploy ? <button className="item_sports--button-deploy" onClick={e => setDeploy(!deploy)}><KeyboardArrowUpIcon fontSize="large" /></button>
                    : <button className="item_sports--button-deploy" onClick={e => setDeploy(!deploy)}><KeyboardArrowDownIcon fontSize="large" /></button>}

            </div>
            {events.length > 0 && deploy ?
                <div className="item_sports--events">
                    <h4 className="item_sports--events-title">Events</h4>
                    {events.map((e, i) => {
                        return <ItemEvent event={e} />
                    })}
                </div>
                : null
            }

        </section>
    )
}