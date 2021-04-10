import styled from "@emotion/styled";

export const Page = styled.div``;

export const PageHeader = styled.header``;

export const Logo = styled.div`
    font-size: 2em;
    font-weight: bold;
`.withComponent((props: any) => (
    <div {...props}>Fun With Activities</div>
));

const navBarHeight = "65px";

export const NavBar = styled.nav`
    display: flex;
    height: ${navBarHeight};
    justify-content: space-between;
    align-items: center;
    background-color: orange;
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

export const PageContent = styled.main`
    max-width: 1440px;
    min-height: calc(100vh - ${navBarHeight});
    margin: 0 auto;
    background-color: whitesmoke;
`;