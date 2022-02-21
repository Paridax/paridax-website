import * as React from 'react';
import '../index.css';
import { IconType } from 'react-icons';
import { BiArrowFromLeft, BiGridAlt, BiHappy, BiMedal, BiStar, BiCog, BiMicrophone, BiStopwatch, BiSpeaker, BiTrophy, BiCake, BiDisc, BiMusic, BiCrown } from 'react-icons/bi';
import { MdOutlineWavingHand, MdChatBubbleOutline, MdOutlineTextSnippet, MdOutlineSearch, MdShowChart } from 'react-icons/md';
import { RiBankLine, RiHammerLine, RiLifebuoyLine } from 'react-icons/ri';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaRedditAlien, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';

export const Sidebar = (props: {barShown: boolean}) => {
    const navigate = useNavigate();
    let barShown = props.barShown;

    const server = {
        id: '919996424417075260',
        icon: 'd5e0742f7e6dcc6b534a8e64a0fbe156',
        name: 'Bot Development 1'
    }
    const serverIcon = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}`;

    const [barCompact, setBarMode] = React.useState(false);
    const [scSmall, updateScreenSize] = React.useState(false);

    window.addEventListener('resize', () => {
        window.innerWidth < parseInt('1024') ? updateScreenSize(true) : updateScreenSize(false);
    });

    function toggleSidebar() {
        window.blur();
        return(barCompact ? setBarMode(false): setBarMode(true));
    }

    React.useEffect(() => {
        // console.log(barCompact);
    }, [barCompact]);

    function SidebarListItem(props: { Icon: IconType, text: string, selector?: RegExp, redirect?: string, locked?: boolean, alert?: {col: string, msg: string}}) {
        const win = window.location.href;
        let selected = false;
        let locked = props.locked;
        let tab = locked ? -1 : undefined;
        if (props.selector && win.match(props.selector)) selected = true;

        function handleClick() {
            if (selected || locked || !props.redirect) return;
            if (props.redirect.match(/^https?:\/\//)) { window.location.href = props.redirect; } else if (props.redirect.startsWith('//')) { window.location.href = win.split('/').slice(0, -1).join('/'); } else { navigate(props.redirect); }
        }

        const styles = `border-2 border-opacity-0 flex outline-none transition-all overflow-hidden transform  
        px-1.5 py-1 mb-1 items-center gap-3 rounded-md
        ${barCompact ? `w-full` : `w-full`}
        ${selected && !locked ? `focus:border-opacity-100 focus:border-gray-500 text-white bg-gray-600` : 
        locked ? `text-gray-500` : 
        `focus:border-opacity-100 text-gray-400 hover:bg-gray-700 focus:bg-gray-700 focus:border-gray-600 hover:text-white focus:text-white`}`;

        return (
            <button onClick={handleClick}
                className={styles}
                tabIndex={tab}>
                <div className="w-72 flex">
                    <div className={`w-8 h-8 flex flex-shrink-0 items-center justify-center`}>
                        <props.Icon className={`text-2xl transform select-none`} />
                    </div>
                    <div className={`ml-2 flex w-full flex-shrink-0 gap-2 items-center justify-between whitespace-nowrap text-sm ${barCompact ? `opacity-100` : `opacity-100`}`}>
                        <h1 className="relative flex-grow flex-shrink-0 text-left">{props.text}</h1>
                        {props.alert ? 
                            <span className={`flex-shrink-0 bg-${props.alert.col}-500 text-${props.alert.col}-100 font-semibold opacity-75 rounded-full px-1 py-0.5 text-xs`}>{props.alert.msg}</span>
                        : null}
                    </div>
                </div>
            </button>
        );
    }

    function SidebarDivider(props: {text: string}) {
        return (
            <div className={`flex items-center my-2 h-4 w-full px-2 ${barCompact ? `justify-around` : ``}`}>
                <div className={`flex items-center h-4 w-full overflow-hidden whitespace-nowrap`}>
                    <div className={`flex w-72 items-center`}>
                        <h1 className={`mr-2 font-extrabold text-xs ${barCompact ? `hidden` : ``}`}>{props.text.toUpperCase()}</h1>
                        <div className={`border-t border-gray-700 w-72 h-0 ${!barCompact ? `hidden` : ``}`}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex-none border-r border-gray-700 overflow-hidden h-full ${scSmall ? (barShown ? 'absolute w-72' : 'absolute w-20 -left-20') : !barShown && barCompact ? `w-72 lg:w-20` : `2xs:hidden lg:block w-72`} duration-300 ease-out`}>
            <div id="sidebar" className={`h-screen bg-gray-850 overflow-x-hidden scrollbar-hidden sidebar ${barShown ? 'lg:block absolute w-72 lg:static lg:w-20 z-20' : !barShown && barCompact ? `w-72 lg:w-20` : `2xs:hidden lg:block w-72`} p-4 duration-300 ease-out`}>
                <div className="w-full h-full">
                    <div className="flex w-72 items-center gap-3 px-2">
                        <button className={`select-none rounded-md text-gray-500 hover:text-gray-300 focus:text-gray-300 outline-none overflow-hidden w-8 h-8 duration-100 flex items-center justify-center`} onClick={toggleSidebar}>
                            <BiArrowFromLeft className={`text-2xl transform ${!barCompact ? `rotate-180` : ``} duration-300`} />
                        </button>
                        <div className={`select-none flex items-center font-bold text-2xl ${barCompact ? `transform translate-x-1 opacity-0 duration-200` : `transform translate-x-2 opacity-100 duration-300`} `}>
                            <Logo redirect="/dashboard" />
                        </div>
                    </div>
                    <div className="my-4 px-2 py-1.5 w-full overflow-hidden rounded-md">
                        <div className="w-96 flex items-center">
                            <img src={serverIcon} alt={server.name} className="bg-green-500 rounded-full w-8 h-8 select-none" />
                            <h1 className="ml-2 font-semibold w-48 truncate">{server.name}</h1>
                        </div>
                    </div>
                    {/* alert={{ col: "yellow", msg: "Coming Soon!" }} */}
                    <div className="pb-5">
                        <div>
                            <SidebarListItem Icon={BiGridAlt} text="Dashboard" redirect="/dashboard/:guildId" selector={/\/\d+\/?$/gi} />
                            <SidebarListItem Icon={BiMedal} text="Leaderboard" redirect="leaderboard" selector={/\/?leaderboard+\/?$/gi} />
                            <SidebarListItem Icon={BiHappy} locked text="Custom Bot" />
                            <SidebarListItem Icon={BiCog} text="Settings" redirect="settings" selector={/\/?settings+\/?$/gi} />
                            <SidebarListItem Icon={BiStar} text="Premium" redirect="premium" selector={/\/?premium+\/?$/gi} />
                            <SidebarDivider text="SERVER MANAGEMENT" />
                            <SidebarListItem Icon={MdOutlineWavingHand} text="Welcome" redirect="welcome" selector={/\/?welcome+\/?$/gi} />
                            <SidebarListItem Icon={MdChatBubbleOutline} text="Custom Commands" redirect="custom_commands" selector={/\/?custom_commands+\/?$/gi} />
                            <SidebarListItem Icon={BiCrown} text="Reaction Roles" redirect="reaction_roles" selector={/\/?reaction_roles+\/?$/gi} />
                            <SidebarListItem Icon={RiHammerLine} text="Moderator" redirect="moderator" selector={/\/?moderator+\/?$/gi} />
                            <SidebarDivider text="UTILITIES" />
                            <SidebarListItem Icon={MdOutlineTextSnippet} text="Embeds" redirect="embeds" selector={/\/?embeds+\/?$/gi} />
                            <SidebarListItem Icon={MdOutlineSearch} text="Search Anything" redirect="search" selector={/\/?search+\/?$/gi} />
                            <SidebarListItem Icon={BiMicrophone} text="Record" redirect="record" selector={/\/?record+\/?$/gi} />
                            <SidebarListItem Icon={RiLifebuoyLine} text="Help" redirect="help" selector={/\/?help+\/?$/gi} />
                            <SidebarListItem Icon={BiStopwatch} text="Timers" redirect="timers" selector={/\/?timers+\/?$/gi} />
                            <SidebarListItem Icon={MdShowChart} text="Statistics Channels" redirect="stats_channels" selector={/\/?stats_channels+\/?$/gi} />
                            <SidebarListItem Icon={BiSpeaker} text="Temporary Channels" redirect="temp_channels" selector={/\/?temp_channels+\/?$/gi} />
                            <SidebarDivider text="SOCIAL CONNECTORS" />
                            <SidebarListItem Icon={FaTwitch} text="Twitch" />
                            <SidebarListItem Icon={FaTwitter} text="Twitter" />
                            <SidebarListItem Icon={FaYoutube} text="YouTube" />
                            <SidebarListItem Icon={FaRedditAlien} text="Reddit" />
                            <SidebarListItem Icon={FaInstagram} text="Instagram" />
                            <SidebarDivider text="ENGAGEMENT & FUN" />
                            <SidebarListItem Icon={BiTrophy} text="Levels" redirect="embeds" selector={/\/?embeds+\/?$/gi} />
                            <SidebarListItem Icon={BiCake} text="Birthdays" redirect="search" selector={/\/?search+\/?$/gi} />
                            <SidebarListItem Icon={BiMusic} text="Music" redirect="record" selector={/\/?record+\/?$/gi} />
                            <SidebarListItem Icon={BiDisc} text="Music Quiz" redirect="help" selector={/\/?help+\/?$/gi} />
                            <SidebarListItem Icon={RiBankLine} text="Economy" redirect="timers" selector={/\/?timers+\/?$/gi} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
