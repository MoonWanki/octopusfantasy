import React, { Component } from 'react'

import { Header, Carousel } from 'Components'

class Home extends Component {

    componentDidMount = () => window.scrollTo(0, 0)

    render() {
        return (
            <div>
                <Header />
                <Carousel />
                {[1,2,3,4,5,6,7,8,9].map(n =>
                    <p key={n}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id auctor velit. Maecenas sagittis mi leo, quis vehicula nisi scelerisque a. Aenean semper metus ut enim aliquam volutpat. Vivamus id mi sagittis, fermentum metus ut, tincidunt massa. Aliquam ac nisl quam. Nullam rhoncus ultrices nulla, id interdum magna sagittis ut. Morbi ligula sapien, venenatis at pellentesque eget, tempus nec nisi. Fusce sed odio vitae mi egestas bibendum. Nam venenatis accumsan arcu, vel gravida quam malesuada in. Sed lorem magna, porttitor a ante eget, hendrerit egestas enim. In et rhoncus diam. Etiam egestas erat ut nunc condimentum, id feugiat erat suscipit.
                        Integer suscipit tellus id justo dapibus ornare. Mauris cursus tristique lorem eu scelerisque. Ut egestas semper porta. Mauris ac viverra enim, vitae mollis quam. Donec lacus arcu, blandit sed ultrices ut, ullamcorper eu risus. Donec condimentum non est sit amet lobortis. Vestibulum rhoncus ante nec nunc mattis efficitur. Duis nec accumsan lorem. Aenean id diam convallis, volutpat enim ut, dignissim urna. Donec tristique tortor ut leo laoreet, nec tristique massa porta. Maecenas placerat erat rutrum ipsum eleifend, et venenatis sem facilisis.
                        Quisque eros nisi, congue in venenatis at, lobortis vitae ex. Nam in ante varius, maximus felis venenatis, lacinia erat. Sed ac metus eu ipsum dapibus porta. Sed dictum massa eget felis facilisis blandit. Cras mollis ex eget accumsan rutrum. Nulla sit amet massa a mauris cursus facilisis. Proin in quam risus. Aliquam congue elit ac quam maximus, vitae efficitur neque luctus. Proin placerat leo et tortor gravida accumsan. Pellentesque semper sapien fermentum nibh pulvinar porttitor. Proin ornare mollis ex, sed facilisis mi molestie consequat. Nunc laoreet risus sapien, ut efficitur ipsum auctor vel. Quisque at augue tincidunt, volutpat ex id, accumsan nisl.
                        Curabitur porta venenatis dolor vel elementum. Nunc id dolor turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut dapibus sem. Mauris vel imperdiet leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam in justo sed ex ullamcorper vulputate. Nam orci massa, viverra sit amet odio sit amet, pretium volutpat mauris. Aliquam tortor ipsum, tempus at libero non, maximus tempor magna. Proin faucibus sapien augue, at tristique risus aliquet ac. Suspendisse vulputate aliquam erat. Duis suscipit nec leo id condimentum. Ut velit nisi, pellentesque at sodales vitae, imperdiet at metus.
                        Fusce feugiat orci id est dignissim dapibus. Duis eu egestas leo. Ut nunc lectus, ultricies nec velit sit amet, tempor cursus dolor. Pellentesque velit metus, vulputate eget elit eget, luctus gravida felis. Pellentesque sagittis nisi id turpis rhoncus semper. Sed nisi eros, dapibus in tellus facilisis, venenatis iaculis velit. Ut interdum convallis ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus mauris turpis, venenatis sed aliquam at, rhoncus id purus. Vivamus posuere mi vel hendrerit tempor. Aliquam vestibulum ex sit amet lacus eleifend, finibus eleifend augue vulputate. Fusce iaculis fermentum dui, eu iaculis elit dignissim a. Praesent dictum sapien a dignissim porta. Etiam a augue semper, vehicula libero nec, malesuada ipsum. Suspendisse at ligula enim.
                    </p>
                )}
            </div>
        );
    }
};

export default Home;
