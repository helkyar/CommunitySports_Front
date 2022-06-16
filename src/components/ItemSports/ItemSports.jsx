import { useTranslation } from "react-i18next";
import { ItemEvent } from "./Internal/ItemEvent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ItemSports = ({ sport, index, events }) => {
    const navigate = useNavigate();
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
                    : !events.length < 1 ? <button className="item_sports--button-deploy" onClick={e => setDeploy(!deploy)}><KeyboardArrowDownIcon fontSize="large" /></button>
                        : null}

            </div>
            {deploy ?
                <div className="item_sports--events">
                    <h4 className="item_sports--events-title">Events</h4>
                    {events.map((e, i) => {
                        if (i < 3) {
                            return <ItemEvent event={e} />
                        }

                    })}
                    {events.length > 3 ? <button className="item_sports--events-button-aux"
                        onClick={e => navigate('/filterevents')}
                    >Mas eventos</button> : null}
                </div>
                : null
            }

        </section>
    )
}