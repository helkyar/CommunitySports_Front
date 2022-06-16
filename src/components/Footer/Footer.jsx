import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FilterCenter } from 'components/FilterCenter/FilterCenter';

export const Footer = () => {
    const [t, i18n] = useTranslation("global");

    const socialLinks = [
        { icon: TwitterIcon, link: 'https://www.twitter.com' },
        { icon: FacebookIcon, link: 'https://www.facebook.com' },
        { icon: InstagramIcon, link: 'https://www.instagram.com' },
        { icon: LinkedInIcon, link: 'https://www.linkedin.com' }
    ]

    const internalLinks = [
        { text: t("footer.who") },
        { text: t("footer.contact") },
        { text: t("footer.ask") }
    ]

    return (
        <footer className="footer--main">
            <div className="app--wrapper">
                <FilterCenter search={'center'} />
                <div className="footer--slot">
                    {internalLinks.map((e, i) => {
                        return <p className='footer--link' key={i}>{e.text}</p>
                    })}
                </div>
                <div className="footer--slot">
                    <div className="footer--brand">
                        <p className="footer--brand">SPORTS</p>
                    </div>
                    <p className="footer--copyright"> &copy; The bridge 2021-2022</p>
                    <div className="footer--social">
                        {socialLinks.map((e, i) => {
                            return <a href={e.link} target="_blank" rel="noopener noreferrer" className='footer--link-social' key={i}><e.icon className='footer--icon' /></a>
                        })}
                    </div>
                </div>
            </div>
        </footer >
    )
}