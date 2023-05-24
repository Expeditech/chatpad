import logoDark from "./../assets/logo-dark.svg";
import logoLight from "./../assets/logo-light.svg";
import logoMinimalLight from "./../assets/logo-minimal-light.svg";
import logoMinimalDark from "./../assets/logo-minimal-dark.svg";
export function LogoText(props: JSX.IntrinsicElements["svg"]) {
  return (
    <img src={logoDark} style={{width: "100%", height: "100%", padding: "1rem"}}></img>
  );
}

export function LogoTextLight(props: JSX.IntrinsicElements["svg"]) {
  return (
    <img src={logoLight} style={{width: "100%", height: "100%", padding: "1rem"}}></img>
  );
}

export function Logo(props: JSX.IntrinsicElements["svg"]) {
  return (
    <img src={logoDark} style={{width: "100%", height: "100%"}}></img>
  );
}

export function LogoLight(props: JSX.IntrinsicAttributes["svg"]) {
  return(
    <img src={logoLight} style={{width: "100%", height: "100%"}}></img>
  );
}

export function LogoIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <img src={logoMinimalDark} style={{width: "38px", height: "38px", padding: "7px"}}></img>
  );
}

export function LogoIconLight(props: JSX.IntrinsicElements["svg"]) {
  return (
    <img src={logoMinimalLight} style={{width: "38px", height: "38px", padding: "7px"}}></img>
  );
}
