import { HeaderTop } from "./components/desktop/HeaderTop";
import { HeaderBottom } from "./components/common/HeaderBottom";
import { HeaderWrapper } from "./HeaderWrapper";

export const Header = () => {
    return (
        <HeaderWrapper>
            <div className="bg-white">
                <HeaderTop />
                <HeaderBottom />
            </div>
        </HeaderWrapper>
    );
};
