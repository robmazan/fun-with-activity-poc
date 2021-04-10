import styled from "@emotion/styled";

export const Page = styled.div``;

export const PageHeader = styled.header`
    position: sticky;
    top: 0;
`;

export const Logo = styled.span`
    font-size: 2em;
    font-weight: bold;
    font-family: "Playfair Display", sans-serif;
`.withComponent((props: any) => (
    <span {...props}>Fun With Activities</span>
));

const navBarHeight = "65px";

export const NavBar = styled.nav`
    display: flex;
    height: ${navBarHeight};
    justify-content: space-between;
    align-items: center;
    background-color: orange;
    box-shadow: 0 1px 2px gray;
`;

export const NavSection = styled.div`
    padding: 0 10px;
`;

export const NavButton = styled.button`
    appearance: none;
    border: 0;
    margin: 0;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
`;

export const NavLink = styled.span`
    a {
        text-decoration: none;
        color: currentColor;
    }
`;

export const PageTitle = styled.h1`
    font-family: "Playfair Display", sans-serif;
`;

export const PageContent = styled.main`
    max-width: 1440px;
    min-height: calc(100vh - ${navBarHeight});
    margin: 0 auto;
    background-color: whitesmoke;
    box-shadow: 0 2px 5px gray;
    padding: 10px;
`;