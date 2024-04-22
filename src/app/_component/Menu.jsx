import { fetchCategorysMenu } from "../actions";
import LinkMenu from "./LinkMenu";

const Menu = async () => {
    const categorys = await fetchCategorysMenu();

    return (
        <ul className="flex justify-between flex-wrap items-center gap-8">
            <li className="flex-1">
                <LinkMenu href="/" title="Trang chủ" />
            </li>
            {categorys?.length &&
                categorys.map((item, index) => {
                    return (
                        <li key={index} className="flex-1">
                            <LinkMenu
                                href={`/${item?.slugvi}`}
                                title={item?.namevi}
                            />
                        </li>
                    );
                })}
        </ul>
    );
};

export default Menu;
