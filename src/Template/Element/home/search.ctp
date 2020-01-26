<div class="row">
    <div class="col-md-12">
        <form name="frm_search" id="frm_search">
            <div class="row g-mt-10 no-gutters">
                <div class="col-md-2">
                    <div class="form-group">
                        <select class="custom-select form-control-lg rounded-0" name="province" id="province_id">
                            <option value="" selected="">ทุกจังหวัด</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select class="custom-select form-control-lg rounded-0" name="district" id="district_id">
                            <option value="" selected="">ทุกอำเภอ</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select class="custom-select form-control-lg rounded-0" name="subdistrict" id="subdistrict_id">
                            <option value="" selected="">ทุกตำบล</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select class="custom-select form-control-lg rounded-0" name="type" id="asset_type_id">
                            <option value="" selected="">ทุกประเภท</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <select class="custom-select form-control-lg rounded-0" name="startprice" id="startprice">
                            <option value="all" selected="">ตั้งแต่ทุกราคา</option>
                            <option value="500000">500,000</option>
                            <option value="1000000">1,000,000</option>
                            <option value="2000000">2,000,000</option>
                            <option value="3000000">3,000,000</option>
                            <option value="4000000">4,000,000</option>
                            <option value="5000000">5,000,000</option>
                        </select>
                        <select class="custom-select form-control-lg rounded-0" name="endprice" id="endprice">
                            <option value="all" selected="">ถึงทุกราคา</option>
                            <option value="1000000">ถึง 1,000,000</option>
                            <option value="2000000">ถึง 2,000,000</option>
                            <option value="3000000">ถึง 3,000,000</option>
                            <option value="4000000">ถึง 4,000,000</option>
                            <option value="5000000">ถึง 5,000,000</option>
                        </select>
                        <div class="input-group-append">
                            <button class="btn btn-md u-btn-primary rounded-0" type="button" id="bt_search">ค้นหา</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
